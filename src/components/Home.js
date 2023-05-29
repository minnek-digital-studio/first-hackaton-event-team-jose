import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const filesName = ["sshna-8.png", "shhsh-2.png", "PEDro-5.png"];
  const [options, setOptions] = useState();
  const fileInputRef = useRef(null);
  const regexEspecialCaracter = /[@$?¡\-_]/;
  
  const onSubmit = (data) => {
    const dataCustom = Object.assign({}, { option: options }, data);
    const modifiedOptions = filesName.map((name) => {
      if (dataCustom.option === "lowercase") {
        return name.toLowerCase();
      }
      if (dataCustom.option === "uppercase") {
        return name.toUpperCase();
      } 
      if (dataCustom.option === "replace-especial-caracter") {
        return name.replace(regexEspecialCaracter, '');
      } else {
        return name.replace(dataCustom.oldCaracter, dataCustom.newCaracter);
      }
    });
    return modifiedOptions
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };
  return (
    <form className="home" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
      <Button onClick={handleFileClick} component="span" className="btn">
        Seleccionar Archivos
      </Button>

      <Typography style={{ textAlign: "left", paddingTop: "10px" }}>
        Nuevo nombre de archivos
      </Typography>
      <TextField className="textfield-name" {...register("newName")} placeholder="Digite nuevo nombre"/>


      <FormControl component="fieldset" className="optionsContainer">
        <FormLabel component="legend" className="divider">Opciones</FormLabel>

        <RadioGroup name="option" onChange={(e) => setOptions(e.target.value)}>
          <FormControlLabel
            value="lowercase"
            control={<Radio />}
            label="LowerCase"
          />
          <FormControlLabel
            value="uppercase"
            control={<Radio />}
            label="UpperCase"
          />
          <FormControlLabel
            value="replace"
            control={<Radio />}
            label="Replace"
          />
          <FormControlLabel
            value="replace-especial-caracter"
            control={<Radio />}
            label="Replace especial caracter"
          />
        </RadioGroup>
      </FormControl>
      <div className="replaceContainer">
        <div className="replaceRow">
          <Typography style={{ textAlign: "left", paddingTop: "10px" }}>
            Caracter a reemplazar
          </Typography>
          <TextField className="textfield" {...register("oldCaracter")} placeholder="ej: -" />
        </div>
        <div className="replaceRow">
          <Typography style={{ textAlign: "left", paddingTop: "10px" }}>
            Remplazo de caracter
          </Typography>
          <TextField className="textfield" {...register("newCaracter")} placeholder="ej: a" />
        </div>
      </div>
      <input type="submit" onClick={onSubmit} hidden />
      <Button type="submit">
        Enviar
      </Button>
    </form>
  );
};
export default Home;
