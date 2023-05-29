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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
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
      <Button type="submit" className="submitButton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
        Download
      </Button>
    </form>
  );
};
export default Home;
