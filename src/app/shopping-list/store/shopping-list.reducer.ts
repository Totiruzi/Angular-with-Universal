import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}
const initialState: State = {
  ingredients: [
    new Ingredient('Tomatoes', 6),
    new Ingredient('Eggs', 12)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
  ) {
  switch ( action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return{
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS :
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.payload]
        };
    case ShoppingListActions.UPDATE_INGREDIENT :
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updateIngredient = {
        ...ingredient, ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updateIngredient;
      return{
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENT :
      return {
        ...state,
        ingredients: state.ingredients.filter( (ing, ingredientIndex) => {
          return ingredientIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };

      case ShoppingListActions.START_EDIT :
        return {
          ...state,
          editedIngredientIndex: action.payload,
          editedIngredient: {...state.ingredients[action.payload]}
        };

      case ShoppingListActions.STOP_EDIT :
        return {
          ...state,
          editedIngredient: null,
          editedIngredientIndex: -1
        };
    default:
      return state;
  }
}
