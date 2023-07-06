import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.bankAccountRepository.create({
      data: { userId, color, initialBalance, name, type },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountRepository.findMany({
      where: { userId },
      select: {
        color: true,
        id: true,
        initialBalance: true,
        name: true,
        type: true,
        userId: true,
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map((bankAccount) => {
      const transactionsTotal = bankAccount.transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      return {
        ...bankAccount,
        currentBalance: bankAccount.initialBalance + transactionsTotal,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;

    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    return this.bankAccountRepository.update({
      where: { id: bankAccountId },
      data: { color, name, type, initialBalance },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountRepository.delete({
      where: { id: bankAccountId },
    });
  }
}
