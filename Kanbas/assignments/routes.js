import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments = db.assignments || [];
        db.assignments.push(newAssignment);
        res.status(201).send(newAssignment);
    });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const courseAssignments = db.assignments.filter(a => a.course === cid);
        res.send(courseAssignments);
    });

    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = db.assignments.find(a => a._id === aid);
        if (assignment) {
            res.send(assignment);
        } else {
            res.status(404).send("Assignment not found");
        }
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(a => a._id === aid);
        if (assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = { ...db.assignments[assignmentIndex], ...req.body };
            res.sendStatus(204);
        } else {
            res.status(404).send("Assignment not found");
        }
    });

    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const initialLength = db.assignments.length;
        db.assignments = db.assignments.filter(a => a._id !== aid);
        if (initialLength > db.assignments.length) {
            res.sendStatus(204);
        } else {
            res.status(404).send("Assignment not found");
        }
    });
}

export default AssignmentRoutes;
