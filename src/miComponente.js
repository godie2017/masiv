import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, CardHeader, Avatar, Container, Card, 
        Typography, Box, CircularProgress} from '@material-ui/core';
import {green} from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    progress:{
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      marginTop: 15,
    },
    maxWidth: 345,
    marginTop: 5,
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  media: {
    div: {
      maxWidth: "50%",
      maxHeight: "50%",
    },
    height: "auto",
    width: "auto",
  },
  avatar: {
    backgroundColor: green[500],
  },
}));

const labels = {
  0.5: 'Perverso',
  1: 'Malísimo',
  1.5: 'Muy malo',
  2: 'Malo',
  2.5: 'Pasable',
  3: 'Normal',
  3.5: 'Bueno',
  4: 'Muy bueno',
  4.5: 'Buenísimo',
  5: 'Excelente',
};


function Comic(){

    const classes = useStyles();

    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    const [dataComic, setdataComic] = useState(null)

    const url = 'https://xkcd.com/info.0.json';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com'
    
    const proxiedRequest = (url, options = {}) =>
        fetch(`${proxyUrl}/${url}`, {
        ...options,
        headers: {
            ...options.headers,
        },
        })
        .then(resp => resp.json())
        .then(res => setdataComic(res))
        .catch(error => console.error(error))

  
    useEffect(() => {
        proxiedRequest(url)
    }, []);

    return (
      dataComic ?
      <Container>
        <Grid container spacing={2} justify="center">
          <Card className={classes.root} variant="outlined">
            <Grid item xs={12} container>
              <div className={classes.media.div}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {dataComic.title ? dataComic.title.charAt(0).toUpperCase() : null}
                    </Avatar>
                  }
                  titleTypographyProps={{variant:'h6' }}
                  title= {dataComic.title ? dataComic.title : null}
                  subheader= { dataComic.day ? `${dataComic.day}/${dataComic.month}/${dataComic.year}` : null}
                />
              </div>
            </Grid>
            <Grid item xs={12} container justify="center">
              <div className={classes.media.div}>
                <img className={classes.media} 
                  src={dataComic ? dataComic.img : null} 
                  title={dataComic ? dataComic.safe_title : null}
                  alt={dataComic ? dataComic.safe_title : null}
                />
              </div>
            </Grid>
            <Grid item xs={12} container justify="center">
              <Rating
                  name="hover-feedback"
                  value={value}
                  size='large'
                  precision={0.5}
                  onChange={(event, newValue) => {
                  setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                  setHover(newHover);
                  }}
              />
            </Grid>  
            <Grid item xs={12} container justify="center">
              <Typography variant="h5" color="textSecondary">
                  {value !== null && <Box mb={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              </Typography>
            </Grid>
          </Card>
        </Grid> 
      </Container>
      :<Container>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} container justify="center">
            <div className={classes.root.progress}>
              <CircularProgress />
            </div>
          </Grid>
        </Grid>
      </Container>);
}

export default Comic