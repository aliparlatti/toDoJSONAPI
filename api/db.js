const { faker } = require("@faker-js/faker");
module.exports = () => {
    const { faker } = require("@faker-js/faker");
    const data = {
        projects: [],
        issues: [],
        users: [],
    };

    const generatedProjectNumber = 10;
    const generatedIssueNumber = 200;
    const generatedUserNumber = 50;

    for (let i = 1; i <= generatedProjectNumber; i++) {
        const project = {
            id: i,
            title: faker.lorem.words(2),
            description: faker.lorem.paragraph(50),
            image: faker.image.urlPicsumPhotos(),
            manager: i,
            assigned: faker.number.int({
                min: 1,
                max: generatedUserNumber,
            }),
            active: faker.datatype.boolean(),
            startDate: faker.date.past(),
            endDate: faker.date.soon(),
            issues: [],
        };
        data.projects.push(project);
    }
    for (let i = 1; i <= generatedUserNumber; i++) {
        const user = {
            id: i,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            avatar: faker.internet.avatar(),
        };

        data.users.push(user);
    }
    for (let i = 1; i <= generatedIssueNumber; i++) {
        const issue = {
            id: i,
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph({ min: 5, max: 10 }),
            image: faker.image.urlPicsumPhotos(),
            status: faker.helpers.arrayElement([
                "To Do",
                "In Progress",
                "In Review",
                "Done",
                "Closed",
                "Reopened",
                "Resolved",
                "Blocked",
            ]),
            priority: faker.helpers.arrayElement(["low", "medium", "high"]),
            assignee: faker.number.int({
                min: 1,
                max: generatedUserNumber,
            }),
            resolution: faker.helpers.arrayElement([
                "Resolved",
                "Not Resolved",
                "Duplicate",
                "Won't Fix",
                "Done",
            ]),
            createdDate: faker.date.past(),
            updatedDate: faker.date.past(),
            dueDate: faker.date.future(),
            attachments: [],
        };
        const attachmentCount = faker.datatype.number({ min: 2, max: 7 });
        for (let j = 0; j < attachmentCount; j++) {
            const isImage = Math.random() < 0.5;

            const attachment = {
                id: j + 1,
                filename: isImage ? faker.system.fileName() + ".jpg" : "",
                url: isImage ? faker.image.urlPicsumPhotos() : "",
                uploadDate: faker.date.past(),
                comment: faker.lorem.words({ min: 4, max: 15 }),
                user: data.users[
                    faker.datatype.number({
                        min: 1,
                        max: generatedUserNumber,
                    })
                ],
                emojies: [],
            };

            issue.attachments.push(attachment);
        }
        const randomProjectIndex = faker.number.int({
            min: 0,
            max: generatedProjectNumber - 1,
        });
        data.projects[randomProjectIndex].issues.push(issue.id);
        data.issues.push(issue);
    }

    return data;
};
