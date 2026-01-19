
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
const API_URL = "http://localhost:5000/api/Questions"; // Update if your backend URL/port is different

// ------------------ API Functions ------------------
export const getQuestions = () => axios.get<Question[]>(API_URL);

export const getQuestionById = (id: number) => axios.get<Question>(`${API_URL}/${id}`);

export const createQuestion = (question: QuestionInput) => axios.post(API_URL, question);

export const updateQuestion = (id: number, question: Question) => axios.put(`${API_URL}/${id}`, question);

export const deleteQuestion = (id: number) => axios.delete(`${API_URL}/${id}`);
