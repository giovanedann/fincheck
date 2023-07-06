import { Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ bankAccountId, categoryId, userId });

    return this.transactionsRepository.create({
      data: { userId, bankAccountId, categoryId, date, name, type, value },
    });
  }

  findAllByUserId(
    userId: string,
    filters: { month: number; year: number; bankAccountId?: string },
  ) {
    const [queryYear, queryMonth, queryNextMonth] = [
      filters.year,
      filters.month,
      filters.month + 1,
    ];

    return this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        date: {
          gte: new Date(Date.UTC(queryYear, queryMonth)),
          lt: new Date(Date.UTC(queryYear, queryNextMonth)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      bankAccountId,
      categoryId,
      userId,
      transactionId,
    });

    return this.transactionsRepository.update({
      where: { id: transactionId },
      data: { bankAccountId, categoryId, date, name, type, value },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionsRepository.delete({
      where: { id: transactionId },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    categoryId,
    bankAccountId,
    transactionId,
  }: {
    userId: string;
    categoryId?: string;
    bankAccountId?: string;
    transactionId?: string;
  }) {
    if (transactionId) {
      await this.validateTransactionOwnershipService.validate(
        userId,
        transactionId,
      );
    }

    await Promise.all([
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
