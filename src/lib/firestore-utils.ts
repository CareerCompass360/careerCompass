import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"
import type { Career, Blog } from "./types"

// Fetch a single career by name
export async function getCareerByName(careerName: string): Promise<Career | null> {
  try {
    const careersCollection = collection(db, "careers")
    const q = query(careersCollection, where("careerName", "==", careerName))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const data = doc.data()
      return {
        name: data.careerName || careerName,
        careerName: data.careerName || careerName,
        category: data.category,
        description: data.description,
        skillsRequired: data.skillsRequired || [],
        careerPath: data.careerPath || [],
        resources: data.resources || { online: [], offline: [] },
      }
    }
    return null
  } catch (error) {
    console.error("Error fetching career by name:", error)
    return null
  }
}

// Fetch careers by category
export async function getCareersByCategory(category: string): Promise<Career[]> {
  try {
    const careersCollection = collection(db, "careers")
    const q = query(careersCollection, where("category", "==", category))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        name: data.careerName || data.name || "",
        careerName: data.careerName || data.name,
        category: data.category,
        description: data.description,
        skillsRequired: data.skillsRequired || [],
        careerPath: data.careerPath || [],
        resources: data.resources || { online: [], offline: [] },
      }
    })
  } catch (error) {
    console.error("Error fetching careers by category:", error)
    return []
  }
}

// Fetch blog for a career
export async function getBlogForCareer(careerName: string): Promise<Blog | null> {
  try {
    const blogsCollection = collection(db, "blogs")
    const q = query(blogsCollection, where("careerName", "==", careerName))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data(),
      } as Blog
    }
    return null
  } catch (error) {
    console.error("Error fetching blog for career:", error)
    return null
  }
}
