"use client";

import { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    getDocs,
    addDoc,
    serverTimestamp,
    DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/app/firebase";
import Link from "next/link";

interface UserData {
    uid: string;
    name: string;
}

interface ChatData {
    id: string;
    members: string[];
    lastMessage: string;
    updatedAt: Date | null;
}

export default function ChatSidebar() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [chats, setChats] = useState<ChatData[]>([]);

    const currentUser = getAuth().currentUser;

    useEffect(() => {
        if (!currentUser) return;

        const q = query(
            collection(db, "chat"),
            where("members", "array-contains", currentUser.uid),
            orderBy("updatedAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatList: ChatData[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data() as DocumentData;
                return {
                    id: docSnap.id,
                    members: data.members || [],
                    lastMessage: data.lastMessage || "",
                    updatedAt: data.updatedAt?.toDate?.() ?? null,
                };
            });
            setChats(chatList);
        });

        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            const list: UserData[] = snapshot.docs
                .map((docSnap) => {
                    const data = docSnap.data() as DocumentData;
                    return {
                        uid: data.uid,
                        name: data.name || "",
                    };
                })
                .filter((u) => u.uid !== currentUser?.uid);

            setUsers(list);
        };

        fetchUsers();
    }, [currentUser]);

    const createOrOpenChat = async (otherUid: string) => {
        if (!currentUser || currentUser.uid === otherUid) return;

        const q = query(
            collection(db, "chat"),
            where("members", "in", [
                [currentUser.uid, otherUid],
                [otherUid, currentUser.uid],
            ])
        );

        const existing = await getDocs(q);
        if (!existing.empty) {
            return;
        }

        await addDoc(collection(db, "chat"), {
            members: [currentUser.uid, otherUid],
            updatedAt: serverTimestamp(),
            lastMessage: "",
        });
    };

    return (
        <div className=" mb-6">
            <h1 className="text-[var(--color-accent2)] font-bold tracking-wide text-lg mb-5">
                Messages
            </h1>
            <div className="space-y-3">
                {users.length === 0 ? (
                    <div className="flex items-center justify-center flex-col w-full">
                        <div className="loading"></div>
                        <p className="text-[var(--color-accent2)] text-xs mt-2">
                            loading Messages
                        </p>
                    </div>
                ) : (
                    <>
                        {users.slice(0, 5).map((u) => (
                            <div
                                key={u.uid}
                                onClick={() => createOrOpenChat(u.uid)}
                                className="flex items-center p-2 rounded-lg hover:bg-[var(--color-secondary)] cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-white font-bold"></div>
                                <div className="ml-3">
                                    <div className="text-[var(--color-accent2)] font-semibold text-sm">
                                        {u.name}
                                    </div>
                                    <div className="text-[var(--color-accent1)] text-xs">
                                        {chats.find((c) => c.members.includes(u.uid))
                                            ?.lastMessage || "No messages yet"}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Link
                            href="/chat"
                            className="block text-center bg-[var(--color-secondary)] shadow-xs hover:bg-[var(--color-accent4)] transition-all duration-500 w-full py-3 rounded-3xl text-[var(--color-accent2)] font-semibold mt-3 cursor-pointer"
                        >
                            View More
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}