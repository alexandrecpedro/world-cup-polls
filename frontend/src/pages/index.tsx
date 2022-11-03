import Image from "next/image"
import { FormEvent, useState } from "react"
import appPreviewImg from "../assets/app-nlw-cup-preview.png"
import iconCheckImg from "../assets/icon-check.svg"
import logoImg from "../assets/logo.svg"
import usersAvatarExampleImg from "../assets/users-avatar-example.png"
import { api } from "../lib/axios"

interface HomeProps {
  guessCount: number;
  poolCount: number;
  userCount: number;
}

export default function Home({ guessCount, poolCount, userCount }: HomeProps) {
  /** REACT HOOKS **/
  // useState
  const [poolTitle, setPoolTitle] = useState("")

  /** FUNCTIONS **/
  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post("/pools", {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert("The pool was successfully created. The code was copied to the clipboard!")

      setPoolTitle("")
    } catch (error) {
      console.log(error)
      alert("Failed when trying to create the pool. Try again!")
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW World Cup" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Create your own cup pool and share it with friends!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">{userCount}</span> people are already using
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input 
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="What's your pool name?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)} 
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Create my pool!
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          After create your pool, you will receive an unique code that could be used to invite others 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Check icon" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Pools created</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
          <Image src={iconCheckImg} alt="Check icon" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Guesses created</span>
            </div>
          </div>
        </div>
      </main>

      {/* Next automatically optimizes the image in rending */}
      <Image
        src={appPreviewImg}
        alt="Two cell phones displaying a preview of the NLW World Cup application" 
        quality={100} 
      />
    </div>
  )
}

/** HTTP REQUISITION **/
// Executing even if JS is disabled at Browser
// Server Side Handler (Next.JS)
export const getServerSideProps = async () => {
  const [
    guessCountResponse,
    poolCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('guesses/count'),
    api.get('pools/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      guessCount: guessCountResponse.data.count,
      poolCount: poolCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}