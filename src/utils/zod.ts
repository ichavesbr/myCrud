import { z } from "zod"

// 1. Base Schema (e.g., a User in the database)
const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Infer the TypeScript type for type safety
type User = z.infer<typeof userSchema>

// 2. Create Schema (for user input when creating a new user)
const createUserSchema = userSchema.omit({ id: true, createdAt: true })
// or use pick: const createUserSchema = z.object({ name: z.string()... , email: z.string()... });

// 3. Update Schema (for user input when updating an existing user)
const updateUserSchema = userSchema.partial().omit({ id: true, createdAt: true })

// 4. Read/Delete (use the base schema for validating retrieved data or required ID parameter)
const userIdSchema = z.object({ id: z.uuid() })
