import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

function FCheckbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} default={field.value} />}
        />
      }
      {...other}
    />
  );
}

export default FCheckbox;
