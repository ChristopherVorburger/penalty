import * as React from "react";
import Masonry from "react-masonry-css";

// MUI
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

// Components
import Loader from "../../components/Loader";

// Context
import { useAuth } from "../../contexts/authContext";
import { useGlobal } from "../../contexts/globalContext";

// Firebase
import { database, storage } from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

// Styles
import useStyles from "./styles";

const Gallery = () => {
  const classes = useStyles();
  const { setLoading, setOpenSnackbar, setSnackbarMessage, setSnackbarColor } =
    useGlobal();
  const { authUser: auth } = useAuth();

  const [photos, setPhotos] = React.useState();

  const [photoSelected, setPhotoSelected] = React.useState([]);
  const [photoNameError, setPhotoNameError] = React.useState(false);
  const [photoFileError, setPhotoFileError] = React.useState(false);

  const photosCollectionRef = collection(database, "photos");

  React.useEffect(() => {
    onSnapshot(photosCollectionRef, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [photosCollectionRef]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setPhotoFileError(false);
    setPhotoNameError(false);

    const photoRef = ref(storage, `photos/${photoSelected.name}`);

    const photoName = e.target.name.value;

    if (photoSelected.name === undefined) {
      setPhotoFileError(true);
      return;
    } else if (!photoName) {
      setPhotoNameError(true);
      return;
    } else {
      setLoading(true);
      // Upload of the picture in the firebase storage
      await uploadBytes(photoRef, photoSelected);

      // Get the url of the picture
      const photoLink = await getDownloadURL(photoRef);

      // Create the photo in the database
      addDoc(photosCollectionRef, {
        name: photoName,
        url: photoLink,
      })
        .then(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setLoading(false);
          setSnackbarMessage("Photo ajoutée avec succès !");
          setSnackbarColor("success");
          setOpenSnackbar(true);
        })
        .catch((err) => {
          setLoading(false);
          setSnackbarMessage("Impossible d'ajouter la photo");
          setSnackbarColor("error");
          setOpenSnackbar(true);
        });
    }
  };

  // Masonry breakpoints
  const breakpoints = {
    default: 4,
    1100: 2,
    700: 1,
  };

  const handleDeletePhoto = (id) => {
    const docRef = doc(database, "photos", id);
    setLoading(true);
    deleteDoc(docRef)
      .then(() => {
        setLoading(false);
        setSnackbarMessage("Photo supprimée avec succès !");
        setSnackbarColor("success");
        setOpenSnackbar(true);
      })
      .catch(() => {
        setLoading(false);
        setSnackbarMessage("Impossible de supprimer la photo");
        setSnackbarColor("error");
        setOpenSnackbar(true);
      });
  };

  if (!photos) {
    return <Loader />;
  }

  return (
    <Box
      p="2rem"
      sx={{
        "&.MuiBox-root": {
          backgroundColor: "#f4f4f4",
        },
      }}
    >
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo) => {
          return (
            <Card key={photo.id}>
              <CardHeader
                action={
                  auth?.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <>
                      <IconButton onClick={() => handleDeletePhoto(photo.id)}>
                        <DeleteOutline />
                      </IconButton>
                    </>
                  )
                }
                title={photo.name}
              />

              <CardMedia
                component="img"
                key={photo.url}
                image={photo.url}
                alt="firebase"
              />
            </Card>
          );
        })}
      </Masonry>
      <Box>
        <form
          noValidate
          autoComplete="off"
          className={classes.gallery__form}
          onSubmit={handleUpload}
        >
          <Typography variant="h6" color="primary">
            Ajouter une nouvelle image
          </Typography>
          <Input
            onChange={(e) => setPhotoSelected(e.target.files[0])}
            type="file"
            placeholder="Ajouter une photo"
            className={classes.gallery__field}
          />
          {photoFileError ? (
            <Typography color="error">Veuillez choisir une photo</Typography>
          ) : (
            ""
          )}
          <Input
            type="text"
            name="name"
            placeholder="Titre"
            className={classes.gallery__field}
          />
          {photoNameError ? (
            <Typography color="error">Veuillez choisir un titre</Typography>
          ) : (
            ""
          )}
          <Button type="submit" variant="outlined">
            Ajouter
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Gallery;
