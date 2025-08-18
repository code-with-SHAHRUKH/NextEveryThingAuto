"use client";
import { z } from "zod";
import toast from 'react-hot-toast';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { singleRate, updateRate } from "@/http/api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
const formSchema = z.object({
  budgetRate: z.coerce.number().min(0, { message: "Must be ≥ 0" }),
  premiumRate: z.coerce.number().min(0, { message: "Must be ≥ 0" }),
  weeklyMowing: z.coerce.number().min(0, { message: "Must be ≥ 0" }),
  biweeklyMowing: z.coerce.number().min(0, { message: "Must be ≥ 0" }),
  oneTimeMowing: z.coerce.number().min(0, { message: "Must be ≥ 0" }),
});
const RateSettings = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();
  const { data: rateData, isLoading } = useQuery({
    queryKey: ["singleRate"],
    queryFn: singleRate,
  });
  // console.log("Fetched Rate Data:", rateData?.data.data);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budgetRate: 0,
      premiumRate: 0,
      weeklyMowing: 0,
      biweeklyMowing: 0,
      oneTimeMowing: 0
    },
  });
  useEffect(() => {
    if (rateData?.data?.data) {
      const rate = rateData.data.data;
      form.reset({
        budgetRate: rate.budgetRate || 0,
        premiumRate: rate.premiumRate || 0,
        weeklyMowing: rate.weeklyMowing || 0,
        biweeklyMowing: rate.biweeklyMowing || 0,
        oneTimeMowing: rate.oneTimeMowing || 0
      });
    }
  }, [rateData, form]);
  const mutation = useMutation({
    mutationFn: async ({
      // rateId,
      payload,
    }: {
      // rateId: string;
      payload: any;
    }) => {
      // if (!rateId) throw new Error("Rate ID missing");
      return updateRate(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleRate"] });
      toast.success("Rates and Frequencies updated successfully!");
      // router("/admin/orders");
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to update rates and Frequencies."
      );
    },
  });
  const onSubmit = (values: any) => {
    // if (!rateData?.data?.data?._id) return;
    mutation.mutate({
      // rateId: rateData.data.data._id,
      payload: values,
    });
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="ml-6 mr-6 mt-10 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/orders">
                    Orders
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-4">
              {/* <Link to="/dashboard/rates">
                <Button variant="outline">Cancel</Button>
              </Link> */}
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Update Rates</CardTitle>
              <CardDescription>Modify budget and premium rates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="budgetRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Rate ($/sqft)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="premiumRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Premium Rate ($/sqft)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Update Mowing Frequencies</CardTitle>
              <CardDescription>Modify weekly bi-weekly and one-time mowing frequencies.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="weeklyMowing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weekly Mowing Frequency</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="biweeklyMowing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bi-Weekly Mowing Frequency</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oneTimeMowing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One Time Mowing Frequency</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default RateSettings;
