// import { currentUser } from "@clerk/nextjs/server";
// import { prisma } from "./prisma";

// export async function checkUser() {
//     const user = await currentUser()

//     if (!user) {
//         return null;
//     }

//     const existingUser = await prisma.user.findUnique({
//         where: {
//             clerkUserId: user.id
//         }
//     });

//     if (existingUser) {
//         return existingUser;
//     }

//     const newUser = await prisma.user.create({
//         data: {
//             clerkUserId: user.id,
//             email: user.emailAddresses[0].emailAddress,
//             name: `${user.firstName} ${user.lastName}`
//         }
//     });

//     return newUser;
// }