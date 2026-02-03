import { PostCardProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Link className="hover: underline" href={`/post/${post.slug}`}>
          <CardTitle className="text-xl">{post.title}</CardTitle>
        </Link>
        <CardDescription>
          By {post.author.name} - {formatDate(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-gray-500">
        <p>{post.description}</p>
      </CardContent>
    </Card>
  );
}

export default PostCard;
