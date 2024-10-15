import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  portions: number;
}

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    background: linear-gradient(45deg, #ff9a9e 30%, #fad0c4 90%);
    border-radius: 15px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
    color: white;
    height: 48px;
    padding: 0 30px;
    text-transform: none;
    font-weight: bold;
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    background-color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;

    .MuiOutlinedInput-root {
      border-radius: 10px;
    }
  }
`;

function App() {
  const [recipes, setRecipes] = useLocalStorageState<Recipe[]>("recipes", {
    defaultValue: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [newPortions, setNewPortions] = useState(2);

  useEffect(() => {
    if (recipes.length === 0) {
      const boilerplateRecipes: Recipe[] = [
        {
          id: 1,
          name: "Quinoa Buddha Bowl",
          ingredients: [
            { name: "Quinoa", amount: 1, unit: "cup" },
            { name: "Chickpeas", amount: 1, unit: "can" },
            { name: "Avocado", amount: 1, unit: "piece" },
            { name: "Kale", amount: 2, unit: "cups" },
            { name: "Cherry tomatoes", amount: 1, unit: "cup" },
          ],
          instructions: "Cook quinoa. Roast chickpeas. Combine all ingredients in a bowl.",
          portions: 2,
        },
        {
          id: 2,
          name: "Vegan Lentil Curry",
          ingredients: [
            { name: "Red lentils", amount: 1, unit: "cup" },
            { name: "Coconut milk", amount: 1, unit: "can" },
            { name: "Onion", amount: 1, unit: "piece" },
            { name: "Garlic", amount: 3, unit: "cloves" },
            { name: "Curry powder", amount: 2, unit: "tbsp" },
          ],
          instructions: "Sauté onion and garlic. Add lentils, coconut milk, and curry powder. Simmer until lentils are tender.",
          portions: 4,
        },
        {
          id: 3,
          name: "Zucchini Noodles with Pesto",
          ingredients: [
            { name: "Zucchini", amount: 2, unit: "large" },
            { name: "Basil leaves", amount: 2, unit: "cups" },
            { name: "Pine nuts", amount: 1/4, unit: "cup" },
            { name: "Garlic", amount: 2, unit: "cloves" },
            { name: "Olive oil", amount: 1/3, unit: "cup" },
          ],
          instructions: "Spiralize zucchini. Blend basil, pine nuts, garlic, and olive oil for pesto. Toss zucchini noodles with pesto.",
          portions: 2,
        },
        {
          id: 4,
          name: "Stuffed Bell Peppers",
          ingredients: [
            { name: "Bell peppers", amount: 4, unit: "large" },
            { name: "Quinoa", amount: 1, unit: "cup" },
            { name: "Black beans", amount: 1, unit: "can" },
            { name: "Corn", amount: 1, unit: "cup" },
            { name: "Salsa", amount: 1/2, unit: "cup" },
          ],
          instructions: "Cook quinoa. Mix with black beans, corn, and salsa. Stuff mixture into bell peppers and bake.",
          portions: 4,
        },
        {
          id: 5,
          name: "Cauliflower Fried Rice",
          ingredients: [
            { name: "Cauliflower", amount: 1, unit: "head" },
            { name: "Carrots", amount: 2, unit: "medium" },
            { name: "Peas", amount: 1, unit: "cup" },
            { name: "Soy sauce", amount: 2, unit: "tbsp" },
            { name: "Ginger", amount: 1, unit: "tbsp" },
          ],
          instructions: "Rice cauliflower in a food processor. Stir-fry with carrots, peas, soy sauce, and ginger.",
          portions: 4,
        },
      ];
      setRecipes(boilerplateRecipes);
    }
  }, [recipes, setRecipes]);

  const handleOpenDialog = (recipe: Recipe | null) => {
    setEditingRecipe(recipe);
    setNewPortions(recipe ? recipe.portions : 2);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRecipe(null);
  };

  const handleSaveRecipe = () => {
    if (editingRecipe) {
      const updatedRecipe = {
        ...editingRecipe,
        portions: newPortions,
        ingredients: editingRecipe.ingredients.map(ingredient => ({
          ...ingredient,
          amount: (ingredient.amount * newPortions) / editingRecipe.portions
        }))
      };
      setRecipes(recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    } else {
      // Add new recipe logic here
    }
    handleCloseDialog();
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom style={{ color: "#444" }}>
        Plant-Based Recipe Book
      </Typography>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog(null)}
      >
        Add New Recipe
      </StyledButton>
      <List>
        {recipes.map((recipe) => (
          <StyledListItem key={recipe.id}>
            <ListItemText
              primary={recipe.name}
              secondary={`Portions: ${recipe.portions}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(recipe)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRecipe(recipe.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingRecipe ? "Edit Recipe" : "Add New Recipe"}</DialogTitle>
        <DialogContent>
          {editingRecipe && (
            <>
              <Typography gutterBottom>Adjust Portions</Typography>
              <Slider
                value={newPortions}
                onChange={(_, newValue) => setNewPortions(newValue as number)}
                aria-labelledby="portions-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
              <Typography variant="body2" color="textSecondary">
                Ingredients will be adjusted automatically
              </Typography>
            </>
          )}
          {/* Add more fields for editing or creating new recipes */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveRecipe} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AppContainer>
  );
}

export default App;
