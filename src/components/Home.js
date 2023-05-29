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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
//   const regexEspecialCaracter = /[@$?¡\-_]/;

  const onSubmit = (data) => {
    const dataCustom = Object.assign({}, { option: options }, data);
    // const modifiedOptions = filesName.map((name) => {
    //   if (dataCustom.option === "lowercase") {
    //     return name.toLowerCase();
    //   }
    //   if (dataCustom.option === "uppercase") {
    //     return name.toUpperCase();
    //   }
    //   if (dataCustom.option === "replace-especial-caracter") {
    //     return name.replace(regexEspecialCaracter, "");
    //   }
    //   if (dataCustom.option === "replace") {
    //     return name.replace(dataCustom.oldCharacter, dataCustom.newCharacter);
    //   } else {
    //     return name;
    //   }
    // });
    // handleFileUpload(dataCustom.newName);
    const { option, oldCharacter, newCharacter , newName} = dataCustom;

    const optionsBody = {
      uppercase: option === "uppercase",
      lowercase: option === "lowercase",
      capitalize: option === "capitalize",
      replaceAll: option === "replace",
      replaceValues: [oldCharacter, newCharacter],
    };

    fetch("http://192.168.1.168:3030/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: newName ,
        options: optionsBody,
        files: selectedFiles
      }),
    })
    // return modifiedOptions;
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

//   const handleAllFilesDownload = (files) => {
//     files.forEach((file) => {
//       const url = URL.createObjectURL(file);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = file.name;
//       link.click();
//     });
//   };

//   const handleFileUpload = (name) => {
//     if (selectedFiles.length > 0) {
//       const modifiedFiles = Array.from(selectedFiles).map((file) => {
//         const modifiedName = name + getFileExtension(file.name);
//         return new File([file], modifiedName);
//       });
//       console.log("Archivos seleccionados:", modifiedFiles);
//       handleAllFilesDownload(modifiedFiles);
//     }
//   };

//   const getFileExtension = (filename) => {
//     return "." + filename.split(".").pop();
//   };

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
      <input type="submit" onClick={onSubmit} hidden />
      <Button type="submit">Download</Button>
    </form>
  );
};
export default Home;
