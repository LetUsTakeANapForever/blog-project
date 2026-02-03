"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPost, updatePost } from "@/actions/post-actions";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(500, "Description must be less than 500 characters long"),
  content: z.string().min(5, "Content must be at least 5 characters long"),
});

interface PostFormProps {
  isEditing?: boolean;
  post?: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
  };
}

type PostFormValues = z.infer<typeof postSchema>;

function PostForm({ isEditing, post }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            description: post.description,
            content: post.content,
          }
        : {
            title: "",
            description: "",
            content: "",
          },
  });

  const onFormSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;

        if (isEditing && post) {
          res = await updatePost(post.id, formData);
        } else {
          res = await createPost(formData);
        }

        if (res.success) {
          toast.success(
            isEditing && post
              ? "Post is edited successfully!"
              : "Post is created successfully!",
          );
          router.push("/");
        } else {
          toast(res.message);
        }
      } catch (error) {
        toast("Failed to create a post.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          disabled={isPending}
        />
      </div>
      {errors?.title && (
        <p className="text-sm text-red-600">{errors.title.message}</p>
      )}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description"
          {...register("description")}
          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter content"
          className="min-h-[150px] resize-none"
          {...register("content")}
          disabled={isPending}
        />
        {errors?.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit" className="mt-5 w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner /> 'Saving Post...'{" "}
          </>
        ) : isEditing ? (
          "Edit Post"
        ) : (
          "Create Post"
        )}
      </Button>
    </form>
  );
}

export default PostForm;
