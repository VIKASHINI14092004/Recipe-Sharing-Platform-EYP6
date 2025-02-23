import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import ReactFlow, { useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

const AddRecipe = () => {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [dishImage, setDishImage] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setDishImage(imageURL);
    }
  };

  const addStep = () => {
    if (!stepInput || !timeInput) return;

    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: 200, y: nodes.length * 100 },
      data: { label: `${stepInput} (${timeInput} min)` },
      type: "default",
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    if (nodes.length > 0) {
      const newEdge = {
        id: `e${nodes.length}-${nodes.length + 1}`,
        source: (nodes.length).toString(),
        target: (nodes.length + 1).toString(),
      };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }

    setStepInput("");
    setTimeInput("");
  };

  return (
    <Box
      sx={{
        width: "94.5%",
        mt: 0,
        p: 3,
        background: "#F5E8C7",
        borderRadius: 0,
        boxShadow: 4,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="#5A3E2B" fontFamily="Poppins, sans-serif">
        Add Your Recipe
      </Typography>

      <Paper sx={{ p: 3, mb: 3, background: "#E8D5B5", borderRadius: 2 }}> 
        <TextField fullWidth label="Dish Name" variant="outlined" value={dishName} onChange={(e) => setDishName(e.target.value)} sx={{ mb: 2, background: "#FAE5C8", borderRadius: 1 }} />
        <TextField fullWidth label="Ingredients (comma-separated)" variant="outlined" value={ingredients} onChange={(e) => setIngredients(e.target.value)} sx={{ mb: 2, background: "#FAE5C8", borderRadius: 1 }} />
      </Paper>

      <Paper sx={{ p: 3, mb: 3, background: "#D9B896", textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h6" mb={2} color="#5A3E2B">
          Add Your Dish Photo
        </Typography>
        <input type="file" accept="image/*" onChange={handleImageUpload} id="dish-image-upload" style={{ display: "none" }} />
        <label htmlFor="dish-image-upload">
          <Button variant="contained" component="span" sx={{ backgroundColor: "#A67C52", "&:hover": { backgroundColor: "#8B5E34" } }}>Upload Image</Button>
        </label>
        {dishImage && <Box mt={2}><img src={dishImage} alt="Dish" style={{ width: "100%", maxHeight: 250, objectFit: "cover", borderRadius: 10, border: "3px solid #A67C52" }} /></Box>}
      </Paper>

      <Paper sx={{ p: 3, mb: 3, background: "#E8D5B5", borderRadius: 2 }}>
        <Typography variant="h6" mb={2} color="#5A3E2B">Cooking Steps</Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField label="Step Description" fullWidth value={stepInput} onChange={(e) => setStepInput(e.target.value)} sx={{ background: "#FAE5C8", borderRadius: 1 }} />
          <TextField label="Time (minutes)" type="number" sx={{ width: 120, background: "#FAE5C8", borderRadius: 1 }} value={timeInput} onChange={(e) => setTimeInput(e.target.value)} />
        </Box>
        <Button variant="contained" onClick={addStep} sx={{ backgroundColor: "#A67C52", "&:hover": { backgroundColor: "#8B5E34" } }}>Add Step</Button>
      </Paper>

      <Paper sx={{ p: 3, background: "#D9B896", borderRadius: 2 }}>
        <Typography variant="h6" mb={2} color="#5A3E2B">Cooking Flowchart</Typography>
        <Box sx={{ height: 300, background: "#F5E8C7", p: 2, borderRadius: 1, border: "2px solid #A67C52" }}>
          <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView />
        </Box>
      </Paper>
    </Box>
  );
};

export default AddRecipe;
