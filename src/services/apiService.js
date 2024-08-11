import axios from "../utils/axiosCustomize.js";

const postCreateNewUser = (email, password, username, role, image) => {
     // submit data
     const data = new FormData();
     data.append('email', email);
     data.append('password', password);
     data.append('username', username);
     data.append('role', role);
     data.append('userImage', image);

     return axios.post('api/v1/participant', data)
}

const getAllUsers = () => {
     return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
     // submit data
     const data = new FormData();
     data.append('id', id)
     data.append('username', username);
     data.append('role', role);
     data.append('userImage', image);

     return axios.put('api/v1/participant', data)
}

const deleteUser = (userId) => {
     return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUsersWithPaginate = (page, limit) => {
     return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (userEmail, userPassword) => {
     return axios.post(`api/v1/login`
          , { email: userEmail, password: userPassword })
}

const postSignUp = (email, password, username) => {
     // submit data
     const data = new FormData();
     data.append('email', email);
     data.append('password', password);
     data.append('username', username);
     data.append('role', 'USER');
     data.append('userImage', '');

     return axios.post('api/v1/participant', data)
}

const getQuizByUser = () => {
     return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (id) => {
     return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
     return axios.post(`api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
     const data = new FormData();
     data.append('description', description);
     data.append('name', name);
     data.append('difficulty', difficulty);
     data.append('quizImage', image);

     return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
     return axios.get(`api/v1/quiz/all`);
}

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
     const data = new FormData();

     data.append('id', id);
     data.append('name', name);
     data.append('description', description);
     data.append('difficulty', difficulty)
     data.append('quizImage', quizImage);

     return axios.put(`api/v1/quiz`, data)
}

const deleteQuiz = (quizId) => {
     return axios.delete(`api/v1/quiz/${quizId}`);
}

const postCreateQuestionForQuiz = (quizId, description, image) => {
     const data = new FormData();

     data.append('quiz_id', quizId);
     data.append('description', description);
     data.append('questionImage', image);

     return axios.post(`api/v1/question`, data)
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
     return axios.post(`api/v1/answer`, {
          description, correct_answer, question_id
     })
}

const logout = (email, refresh_token) => {
     return axios.post(`api/v1/logout`, {
          email, refresh_token
     })
}

const postAssignQuiz = (quizId, userId) => {
     return axios.post(`api/v1/quiz-assign-to-user`, {
          quizId, userId
     })
}

const getQuizWithQA = (quizId) => {
     return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
     return axios.post(`api/v1/quiz-upsert-qa`, {...data})
}

export {
     postCreateNewUser, getAllUsers,
     putUpdateUser, deleteUser,
     getUsersWithPaginate, postLogin,
     postSignUp, getQuizByUser,
     getDataQuiz, postSubmitQuiz,
     postCreateNewQuiz, getAllQuizForAdmin,
     putUpdateQuiz, deleteQuiz,
     postCreateQuestionForQuiz, postCreateNewAnswerForQuestion,
     postAssignQuiz, getQuizWithQA,
     postUpsertQA, logout
}