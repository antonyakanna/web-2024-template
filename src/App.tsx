import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Paper,
  Container,
} from "@mui/material";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const AppContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
`;

const StyledListItem = styled(ListItem)`
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

function App() {
  const [todoItems, setTodoItems] = useLocalStorageState<TodoItem[]>("cyprusVisaTodos", {
    defaultValue: [],
  });

  useEffect(() => {
    if (todoItems.length === 0) {
      const initialTodos: TodoItem[] = [
        { id: 1, text: "Check passport validity (must be valid for at least 6 months)", completed: false },
        { id: 2, text: "Fill out the Cyprus visa application form", completed: false },
        { id: 3, text: "Gather required documents (passport photos, bank statements, etc.)", completed: false },
        { id: 4, text: "Book flight tickets", completed: false },
        { id: 5, text: "Reserve accommodation", completed: false },
        { id: 6, text: "Purchase travel insurance", completed: false },
        { id: 7, text: "Schedule visa appointment at the Cyprus embassy/consulate", completed: false },
        { id: 8, text: "Pay visa application fee", completed: false },
        { id: 9, text: "Attend visa interview (if required)", completed: false },
        { id: 10, text: "Wait for visa processing", completed: false },
        { id: 11, text: "Collect passport with visa", completed: false },
        { id: 12, text: "Make copies of all important documents", completed: false },
        { id: 13, text: "Inform your bank about travel plans", completed: false },
        { id: 14, text: "Check and pack necessary items for the trip", completed: false },
      ];
      setTodoItems(initialTodos);
    }
  }, [todoItems, setTodoItems]);

  const handleToggle = (id: number) => {
    setTodoItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <AppContainer maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Cyprus Visa Application Checklist
        </Typography>
        <List>
          {todoItems.map((item) => (
            <StyledListItem key={item.id} dense button onClick={() => handleToggle(item.id)}>
              <Checkbox
                edge="start"
                checked={item.completed}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText 
                primary={item.text}
                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
              />
            </StyledListItem>
          ))}
        </List>
      </StyledPaper>
    </AppContainer>
  );
}

export default App;
