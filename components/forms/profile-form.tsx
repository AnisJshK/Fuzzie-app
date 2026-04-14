"use client";
import { EditUserProfileSchema } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  user: any;
  onUpdate?: any;
};

const ProfileForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  // const handleSubmit = async (values:z.infer<typeof EditUserProfileSchema>)=>{
  //     setIsLoading(true)
  //     await onUpdate(values.name)
  //     setIsLoading(false);
  // }
  // useEffect(()=>{
  //     form.reset({name:user.name,email:user.email})
  // },[user])
  return (
    <form className="flex flex-col gap-6" onSubmit={() => {}}>
      <Controller
        disabled={isLoading}
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-lg">User full name</FieldLabel>
            <Input
              {...field}
              placeholder="Name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
      control={form.control}
      name="email"
      render={({field,fieldState})=>(
        <Field data-invalid = {fieldState.invalid}>
            <FieldLabel className="text-lg">Email</FieldLabel>
            <Input 
            {...field}
            disabled={true}
            placeholder="Email"
            type="email"
            aria-invalid = {fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors ={[fieldState.error]}/>}
        </Field>
      )}
      />
      <Button type="submit"
      className="self-start hover:bg-[#2F006B] hover:text-white hover:border-[1px]" 
      >
        {isLoading?(
            <>
             <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
             Saving
            </>
           ):(
            'Save User Settings'
        )}
      </Button>
    </form>
  );
};

export default ProfileForm;
