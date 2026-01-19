"use client";

import React, { useEffect, useState } from "react";
import { Question, QuestionInput, getQuestions, createQuestion, updateQuestion, deleteQuestion } from "@/lib/api";

const QuestionsPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<QuestionInput>({ title: "", difficulty: "", answer: "" });
    const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
    const [editQuestion, setEditQuestion] = useState<QuestionInput>({ title: "", difficulty: "", answer: "" });

    useEffect(() => { fetchQuestions(); }, []);

    const fetchQuestions = async () => {
        try {
            const response = await getQuestions();
            setQuestions(response.data);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleAdd = async () => {
        if (!newQuestion.title || !newQuestion.difficulty || !newQuestion.answer) {
            return alert("Please fill all fields!");
        }
        try {
            await createQuestion(newQuestion);
            setNewQuestion({ title: "", difficulty: "", answer: "" });
            fetchQuestions();
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try { await deleteQuestion(id); fetchQuestions(); }
        catch (error) { console.error("Error deleting question:", error); }
    };

    const handleEdit = (q: Question) => {
        setEditQuestionId(q.id);
        setEditQuestion({ title: q.title, difficulty: q.difficulty, answer: q.answer });
    };

    const handleUpdate = async () => {
        if (editQuestionId === null) return;
        try {
            await updateQuestion(editQuestionId, { id: editQuestionId, ...editQuestion });
            setEditQuestionId(null);
            setEditQuestion({ title: "", difficulty: "", answer: "" });
            fetchQuestions();
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <h1 className="text-3xl font-semibold" style={{ textAlign: "center", color: "#1f2937", marginBottom: "30px" }}>💡 Interview Questions</h1>

            {/* Add New Question */}
            <div style={{
                marginBottom: "30px",
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: "#f0f4f8",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ marginBottom: "15px", color: "#2563eb" }}>Add Question</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "30%" }}
                />
                <input
                    type="text"
                    placeholder="Difficulty"
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                    style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "20%" }}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc", width: "35%" }}
                />
                <button onClick={handleAdd} style={{
                    padding: "8px 16px",
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#15803d")}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = "#16a34a")}
                >
                    Add
                </button>
            </div>

            {/* Questions List */}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {questions.map((q) => (
                    <li key={q.id} style={{
                        marginBottom: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        padding: "15px",
                        backgroundColor: "#ffffff",
                        transition: "transform 0.1s",
                    }}
                        onMouseOver={e => (e.currentTarget.style.transform = "scale(1.02)")}
                        onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        {editQuestionId === q.id ? (
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <input type="text" value={editQuestion.title} onChange={e => setEditQuestion({ ...editQuestion, title: e.target.value })} style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", flex: "1" }} />
                                <input type="text" value={editQuestion.difficulty} onChange={e => setEditQuestion({ ...editQuestion, difficulty: e.target.value })} style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "150px" }} />
                                <input type="text" value={editQuestion.answer} onChange={e => setEditQuestion({ ...editQuestion, answer: e.target.value })} style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", flex: "2" }} />
                                <button onClick={handleUpdate} style={{ padding: "6px 12px", backgroundColor: "#2563eb", color: "white", borderRadius: "6px", cursor: "pointer" }}>Save</button>
                                <button onClick={() => setEditQuestionId(null)} style={{ padding: "6px 12px", backgroundColor: "#ef4444", color: "white", borderRadius: "6px", cursor: "pointer" }}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h3 style={{ margin: "0 0 5px 0", color: "#1f2937", fontSize: "20px", fontWeight: 'bold' }}>{q.title} <span style={{ fontSize: "15px", color: "#6b7280" }}>({q.difficulty})</span></h3>
                                <p style={{ margin: "0 0 10px 0", color: "#374151" }}>{q.answer}</p>
                                <button onClick={() => handleEdit(q)} style={{ padding: "6px 12px", backgroundColor: "#f59e0b", color: "white", borderRadius: "6px", marginRight: "5px", cursor: "pointer" }}>Edit</button>
                                <button onClick={() => handleDelete(q.id)} style={{ padding: "6px 12px", backgroundColor: "#ef4444", color: "white", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionsPage;
