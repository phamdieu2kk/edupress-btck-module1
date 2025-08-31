// src/hook/useCourseLessons.js
import { useState, useEffect } from "react";
import axios from "axios";

const useCourseLessons = (courseId) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lessons/course/${courseId}`
        );

        const data = res.data.sections || {};
        const sectionsArray = Object.keys(data).map((sectionName) => {
          const subLessonsRaw = Array.isArray(data[sectionName])
            ? data[sectionName]
            : [];
          const subLessons = subLessonsRaw
            .map((lesson) => {
              if (lesson.subLessons && lesson.subLessons.length > 0) {
                return lesson.subLessons.map((sub) => ({
                  ...sub,
                  title: sub.title || lesson.title,
                  type: lesson.type || "video",
                  isLocked: lesson.isLocked || false,
                  isCompleted: lesson.isCompleted || false,
                  questions: lesson.questions || null,
                  _id: sub._id,
                }));
              }
              return {
                title: lesson.title,
                duration: lesson.duration,
                type: lesson.type || "video",
                isLocked: lesson.isLocked || false,
                isCompleted: lesson.isCompleted || false,
                questions: lesson.questions || null,
                _id: lesson._id,
              };
            })
            .flat();
          return { _id: sectionName, title: sectionName, subLessons };
        });

        setSections(sectionsArray);

        // Tính tổng số lesson cho toàn khóa học
        const total = sectionsArray.reduce(
          (acc, section) => acc + (section.subLessons?.length || 0),
          0
        );
        setTotalLessons(total);
      } catch (err) {
        console.error(err);
        setError("Unable to load curriculum. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  return { sections, loading, error, totalLessons };
};

export default useCourseLessons;
