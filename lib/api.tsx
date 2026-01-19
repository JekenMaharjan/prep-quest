
import axios from "axios";

// ------------------ Types ------------------
export type Question = {
    id: number;
    title: string;
    difficulty: string;
    answer: string;
};

export type QuestionInput = Omit<Question, "id">;

// ------------------ API URL ------------------
// const API_URL = "http://localhost:5000/api/Questions"; 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// ------------------ API Functions ------------------
export const getQuestions = () =>
    axios.get<Question[]>(API_BASE_URL);

export const getQuestionById = (id: number) =>
    axios.get<Question>(`${API_BASE_URL}/${id}`);

export const createQuestion = (question: QuestionInput) =>
    axios.post(API_BASE_URL, question);

export const updateQuestion = (id: number, question: Question) =>
    axios.put(`${API_BASE_URL}/${id}`, question);

export const deleteQuestion = (id: number) =>
    axios.delete(`${API_BASE_URL}/${id}`);
