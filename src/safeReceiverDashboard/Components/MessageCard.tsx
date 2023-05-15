import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IMessageCardProps {
  date: string;
  title: string;
  message: string;
}

export default function MessageCard({ date, title, message }: IMessageCardProps) {
  const text: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi velit temporibus sed laudantium optio incidunt, ea reiciendis at ab nobis voluptatibus facere libero rerum, deserunt nulla inventore quam perspiciatis! Lorem ipsum dolor sit amet consectetur adipisicing elit. A nemo at officia totam maiores, quas repellendus dolore repudiandae mollitia, iusto sequi vero ipsum excepturi facere aut veritatis voluptatem eius est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi reiciendis repellendus at. Porro rem hic aut impedit odit facilis a, architecto, consequuntur reprehenderit, voluptatibus totam numquam nemo obcaecati incidunt adipisci!";
  
  return (
      <Card sx={{ 
        my: 2,
        minWidth: 275,
        maxHeight: '78%',
        overflow: 'auto'
         }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            date sent: {date}
          </Typography>
          <Typography variant="h5" component="div">
            Title: {title}
          </Typography>
          <Typography variant="body2">
            the message: {message}. {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">reply</Button>
        </CardActions>
      </Card>
  );
}
