import { z } from 'zod';

// 1. Base Schema (matches your Prisma model)
export const CollectionSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 2. Create Schema (what the frontend sends to create one)
export const CreateCollectionSchema = CollectionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// 3. Update Schema (what the frontend sends to update one)
export const UpdateCollectionSchema = CreateCollectionSchema.partial();

// 4. Export Types (so you get TypeScript autocomplete everywhere)
export type Collection = z.infer<typeof CollectionSchema>;
export type CreateCollection = z.infer<typeof CreateCollectionSchema>;
export type UpdateCollection = z.infer<typeof UpdateCollectionSchema>;