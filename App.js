import React, { useState } from 'react';
import { StyleSheet, 
  View, 
  Button,
  FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHander = (goalTitle) => {
    setCourseGoals([...courseGoals, {id: Math.random().toString(), value: goalTitle}]);
    console.log(courseGoals);
    setIsAddMode(false);
  };

  const removeGoalHander = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
    console.log(courseGoals);
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style= {styles.screen}>
        <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
        <GoalInput visible={isAddMode} onAddGoal={addGoalHander} onCancel={cancelGoalAdditionHandler}/>
        <FlatList 
          keyExtractor={(item,index) => item.id}
          data={courseGoals} 
          renderItem = {itemData => 
          <GoalItem 
            onDelete={removeGoalHander.bind(this, itemData.item.id)} 
            title={itemData.item.value}/>} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30
  },
});