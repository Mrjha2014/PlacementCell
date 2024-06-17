const Student = require('../models/Student');

const studentController = {
    // Get all students
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find({});
            res.render('studentList', { students });
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    // Add a new student
    addNewStudent: async (req, res) => {
        try {
            const { name, college, batch, status, dsaScore, webDScore, reactScore } = req.body;

            // Create a new Student instance
            const newStudent = new Student({
                name,
                college,
                batch,
                status,
                dsaScore,
                webDScore,
                reactScore
            });

            // Save the new student to the database
            await newStudent.save();

            // Flash success message
            req.flash('success', 'New student added');

            // Redirect to the student list page
            res.redirect('/students');
        } catch (error) {
            console.error('Error adding new student:', error);
            req.flash('error', 'Error adding new student');
            res.redirect('/students');
        }
    }
};

module.exports = studentController;
