import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { UserAddressType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const addressFormFields = z.object({
  address_line_1: z.string().min(1),
  address_line_2: z.string().min(1),
  street_name: z.string().min(1),
  city: z.string().min(1),
  postal_code: z.string().min(1),
  country: z.string().min(1),
});

export default function NewAddress() {
  const { error, loading, requestFunction } = useAxiosQuery();

  const navigate = useNavigate();
  const urlQuery = new URLSearchParams(useLocation().search);

  const addressForm = useForm<z.infer<typeof addressFormFields>>({
    resolver: zodResolver(addressFormFields),
    defaultValues: {
      address_line_1: "",
      address_line_2: "",
      street_name: "",
      city: "",
      postal_code: "",
      country: "",
    },
  });

  const onCancel = () => navigate(-1);

  const onAddressSubmit = async (data: z.infer<typeof addressFormFields>) => {
    const requestFunctionParams =
      urlQuery.get("type") === "new"
        ? {
            urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/address`,
            method: RequestMethod.POST,
            data: {
              user_address: data,
            },
          }
        : {
            urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/address/${urlQuery.get("id")}`,
            method: RequestMethod.PUT,
            data: {
              address: data,
            },
          };
    const resp = await requestFunction(requestFunctionParams);
    if (resp?.status === 201 || resp?.status === 200) {
      toast({
        title: "Success",
        description: resp?.data.message,
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    (async () => {
      const addressId = urlQuery.get("id");
      if (addressId) {
        const addressData = await requestFunction({
          urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/address/${addressId}`,
          method: RequestMethod.GET,
        });
        const addressFormData: UserAddressType = addressData?.data.data;
        addressForm.reset({
          address_line_1: addressFormData.address_line_1,
          address_line_2: addressFormData.address_line_2,
          street_name: addressFormData.street_name,
          city: addressFormData.city,
          postal_code: addressFormData.postal_code,
          country: addressFormData.country,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (error)
      toast({
        title: "Error",
        description: error,
      });
  }, [error]);

  return (
    <div className="h-screen flex justify-center">
      <Form {...addressForm}>
        <form
          onSubmit={addressForm.handleSubmit(onAddressSubmit)}
          className="flex flex-col space-y-4 p-4 w-96 h-fit mt-4"
        >
          <Label className="w-full text-center font-bold md:text-xl">
            Address Details
          </Label>
          <FormField
            control={addressForm.control}
            name="address_line_1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="address line 1" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="address_line_2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="address line 2" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="street_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="street name" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="city" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="postal code" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="country" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full justify-between gap-2">
            <Button className="w-full md:w-40" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="w-full md:w-40" disabled={loading} type="submit">
              Done
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
