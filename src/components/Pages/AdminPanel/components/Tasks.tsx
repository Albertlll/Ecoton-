import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { instanceAxios } from '../../../../../httpConfig';
import gornostay from './animals/gornostay.jpeg'
import philin from './animals/ph.jpeg'
import udod from './animals/udod.jpeg'

interface Task {
  title: string;
  image: string;
  description: string;
}

interface TaskPopupProps {
  onClose: () => void;
  onCreateTask: (task: Task) => void;
}

const TaskPopup: React.FC<TaskPopupProps> = ({ onClose, onCreateTask }) => {
  const [formState, setFormState] = useState<Task>({ title: '', image: '', description: '' });
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        const taskWithImage = { ...formState, image: base64Image };
        onCreateTask(taskWithImage);
        setFormState({ title: '', image: '', description: '' });
        setFile(null);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white p-6 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Создать новое задание</h2>
        <input
          type="text"
          name="title"
          placeholder="Название животного"
          className="w-full mb-2 p-2 border rounded"
          value={formState.title}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full mb-2 p-2 border rounded"
          onChange={handleFileChange}
        />
        <textarea
          name="description"
          placeholder="Описание"
          className="w-full mb-2 p-2 border rounded"
          value={formState.description}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Создать
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Отмена
        </button>
      </motion.div>
    </motion.div>
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { title: 'Горностай', image: gornostay, description: 'Поищите этого забавного проворливого хищника!' },
    { title: 'Удод', image: udod, description: 'Прелесная забавная птичка. Приглашаем вас поучаствовать в квесте и поискать его. Мы уверены удача вам улыбнется!' },
    { title: 'Собака', image: philin, description: 'Квест филина! Филин грациозное создание, попытайтесь найти его!' },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await instanceAxios.get('/api/v1/tasks');
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const handleCreateTask = async (newTask: Task) => {
    // try {
      // const response = await instanceAxios.post('/api/v1/tasks', newTask);
      setTasks([...tasks, newTask]);
      setIsPopupOpen(false);
    // } catch (error) {
      // console.e/rror('Error creating task:', error);
    
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Создать новое задание
      </button>
      {tasks.map((task, index) => (
        <div key={index} className="w-full bg-white rounded-[30px] mb-4 p-4 flex">
          <img src={task.image} alt={task.title} className="w-1/3 h-64 object-cover rounded-[30px]" />
          <div className="w-2/3 pl-4">
            <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-2">Москворецкий парк</p>
            <p className="text-sm">{task.description}</p>
          </div>
        </div>
      ))}
      <AnimatePresence>
        {isPopupOpen && <TaskPopup onClose={() => setIsPopupOpen(false)} onCreateTask={handleCreateTask} />}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;
