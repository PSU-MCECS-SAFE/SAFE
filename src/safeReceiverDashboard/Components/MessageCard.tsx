import * as React from 'react';
import Box from '@mui/material/Box';
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
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          date sent: {date}
        </Typography>
        <Typography variant="h5" component="div">
          Title: {title}
        </Typography>
        <Typography variant="body2">
          the message: {message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">reply</Button>
      </CardActions>
    </Card>
  );
}
