import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PhoneInputField from "./PhoneInputField";
import { Textarea } from "@/components/ui/textarea";
import FileUploadField from "./FileUploadField";
import { Checkbox } from "@/components/ui/checkbox";

type CustomFieldProps = {
    control: any;
    type: "text" | "email" | "password" | "phone" | "datepicker" | "radio" | "select" | "textarea" | "upload" | "checkbox";
    name: string;
    label?: string;
    placeholder?: string;
    icon?: string;
    showTimeSelect?: boolean;
    options?: string[];
    children?: React.ReactNode;
};

const RenderedField = ({ field, props }: { field: any; props: CustomFieldProps }) => {
    const { type, placeholder, icon, showTimeSelect, options, children } = props;

    if (type === "text" || type === "email" || type === "password") {
        return (
            <div className="flex relative">
                {icon && <Image src={icon} width={20} height={20} alt="icon" className="absolute top-1/2 -translate-y-1/2 ml-2" />}
                <Input type={type} {...field} placeholder={placeholder} className={cn(icon ? "!pl-9" : "")} />
            </div>
        );
    }

    if (type === "textarea") {
        return <Textarea {...field} placeholder={placeholder} />;
    }

    if (type === "phone") {
        return <PhoneInputField field={field} placeholder={placeholder} />;
    }

    if (type === "datepicker") {
        return (
            <div className="flex relative ">
                {icon && <Image src={icon} width={20} height={20} alt="icon" className="absolute top-1/2 -translate-y-1/2 ml-2" />}
                <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat={"dd/MM/yyyy"}
                    showTimeSelect={showTimeSelect ?? false}
                    timeInputLabel="Time:"
                    className={cn(icon ? "!pl-9 input" : "input")}
                    placeholderText={placeholder}
                />
            </div>
        );
    }

    if (type === "radio") {
        return (
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-6 items-center">
                {options?.map((option) => (
                    <Label htmlFor={option} key={option} className="flex items-center space-x-2 input border-dashed cursor-pointer">
                        <RadioGroupItem value={option} id={option} />
                        <span>{option}</span>
                    </Label>
                ))}
            </RadioGroup>
        );
    }

    if (type === "select") {
        return (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className={cn(field.value ? "text-primary" : "text-muted-foreground")}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>{children}</SelectContent>
            </Select>
        );
    }

    if (type === "upload") {
        return <FileUploadField files={field.value} onChange={field.onChange} />;
    }

    if (type === "checkbox") {
        return (
            <div className="flex gap-2 items-center text-muted-foreground">
                <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                <label htmlFor={props.name} className="cursor-pointer ">
                    {props.label}
                </label>
            </div>
        );
    }

    return;
};

const CustomField = (props: CustomFieldProps) => {
    const { control, name, label, type } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && type !== "checkbox" && <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        <RenderedField field={field} props={props} />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomField;
