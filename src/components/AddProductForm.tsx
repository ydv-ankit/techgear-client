import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "./ui/use-toast";

const ProductForm = z.object({
  name: z.string().min(2, "product name required"),
  price: z.number().min(0, "price must be greater than 0"),
  image: z.any(),
  discount: z.number().min(0, "discount can't be negative").max(100, "discount can't be greater than 100"),
});

export function AddProductForm() {
  const form = useForm<z.infer<typeof ProductForm>>({
    resolver: zodResolver(ProductForm),
  });
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        form.setValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof ProductForm>) => {
    try {
      const resp = await axios({
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/create`,
        method: "POST",
        data,
      });
      console.log(resp);
    } catch (error: any) {
      console.log(error);
      if (error?.request!.status === 401) {
        toast({
          title: "Error",
          description: "Unauthorised",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="h-screen flex justify-center mt-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Price" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                {imagePreview && (
                  <div className={cn("w-80 h-auto max-h-96 rounded-md overflow-hidden", imagePreview ? "block" : "hidden")}>
                    <img src={imagePreview as string} alt="product preview" />
                  </div>
                )}
                <FormControl>
                  <Input type="file" onChange={handleFileChange} required />
                </FormControl>
                <FormDescription>Product image </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Discount % (if any)" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
