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
  const [options, setOptions] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const onSubmit = (data) => {
    const dataCustom = Object.assign({}, { option: options }, data);
    const { option, oldCharacter, newCharacter, newName } = dataCustom;

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
      formData.append("newName", newName);
      formData.append("uppercase", option === "uppercase");
      formData.append("lowercase", option === "lowercase");
      formData.append("capitalize", option === "capitalize");
      formData.append("replaceAll", option === "replace");
      formData.append("replaceValues", [oldCharacter, newCharacter]);

      fetch("http://192.168.1.168:3030/rename", {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
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
      <TextField
        className="textfield-name"
        {...register("newName")}
        placeholder="Digite nuevo nombre"
      />

      <FormControl component="fieldset" className="optionsContainer">
        <FormLabel component="legend" className="divider">
          Opciones
        </FormLabel>

        <RadioGroup name="option" onChange={(e) => setOptions(e.target.value)}>
          <FormControlLabel
            value="newName"
            control={<Radio />}
            label="New name"
          />
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
            value="capitalize"
            control={<Radio />}
            label="Capitalize"
          />
          <FormControlLabel
            value="replace"
            control={<Radio />}
            label="Replace"
          />
          <FormControlLabel
            value="replace-especial-character"
            control={<Radio />}
            label="Replace especial character"
          />
        </RadioGroup>
      </FormControl>
      <div className="replaceContainer">
        <div className="replaceRow">
          <Typography style={{ textAlign: "left", paddingTop: "10px" }}>
            Caracter a reemplazar
          </Typography>
          <TextField
            className="textfield"
            {...register("oldCharacter")}
            placeholder="ej: -"
          />
        </div>
        <div className="replaceRow">
          <Typography style={{ textAlign: "left", paddingTop: "10px" }}>
            Remplazo de caracter
          </Typography>
          <TextField
            className="textfield"
            {...register("newCharacter")}
            placeholder="ej: a"
          />
        </div>
      </div>
      <input type="submit" hidden />
      <Button type="submit">Download</Button>
    </form>
  );
};
export default Home;
