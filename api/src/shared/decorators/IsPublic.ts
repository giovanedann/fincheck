import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_PUBLIC' as const;

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
