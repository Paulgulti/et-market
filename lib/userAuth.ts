import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "./prisma";

export const userAuth = async () => {
    const user = await currentUser();
    if (!user) {
        return null
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            clerkId: user.id
        },
    })

    if (!existingUser) {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName} ${user.lastName}` 
            }
        })

        return newUser;
    }

    return existingUser;
}