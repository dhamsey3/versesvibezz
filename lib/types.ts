export type User = {
  id: string
  email: string
  username: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Poem = {
  id: string
  title: string
  content: string
  excerpt: string
  author_id: string
  category: string
  likes: number
  created_at: string
  updated_at: string
  author?: User
}

export type Comment = {
  id: string
  poem_id: string
  user_id: string
  content: string
  created_at: string
  user?: User
}

export type Like = {
  id: string
  poem_id: string
  user_id: string
  created_at: string
}
