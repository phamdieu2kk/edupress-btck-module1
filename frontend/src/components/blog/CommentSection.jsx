import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from '@mui/material';

// Dummy comment data
const initialComments = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: '/assets/avatar1.jpg',
    content: 'Khóa học rất hay và bổ ích!',
    date: '25/07/2025',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: '/assets/avatar2.jpg',
    content: 'Giáo viên dạy dễ hiểu, nội dung chi tiết.',
    date: '26/07/2025',
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      const newComment = {
        id: Date.now(),
        name: 'Bạn học viên',
        avatar: '/assets/avatar-default.png',
        content: text,
        date: new Date().toLocaleDateString(),
      };
      setComments([newComment, ...comments]);
      setText('');
    }
  };

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bình luận ({comments.length})
      </Typography>

      {/* Comment Input */}
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Viết bình luận..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ my: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Gửi bình luận
      </Button>

      {/* List of Comments */}
      <Stack spacing={3} mt={4}>
        {comments.map((comment) => (
          <Box key={comment.id}>
            <Stack direction="row" spacing={2}>
              <Avatar src={comment.avatar} alt={comment.name} />
              <Box>
                <Typography fontWeight="bold">{comment.name}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {comment.date}
                </Typography>
                <Typography>{comment.content}</Typography>
              </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CommentSection;
