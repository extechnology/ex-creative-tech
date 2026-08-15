export interface Post {
    id: number;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    authorRole: string;
    authorAvatar: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
    tags: string[];
    content: string;
}