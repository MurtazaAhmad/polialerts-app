"use client"
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

import { db } from '../firebase/config'
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore'

type Props = {}

const Dashboard = (props: Props) => {

    const [value, loading, error] = useCollection(collection(db, 'government_levels'))
    const governmentLevels = value?.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }))

    console.log("governmentLevels2", governmentLevels);

    return (
        <div>page</div>
    )
}

export default Dashboard
