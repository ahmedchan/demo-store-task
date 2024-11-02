import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate, Navigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
// form handling
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// icons
import { AlertCircle } from "lucide-react"
// servies
import { useLoginMutation } from "@/services/auth.service"
import {type CustomError} from "@/types.type"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setCredential, selectCurrenToken } from "@/store/reducers/auth.reducer"
import appConfig from "@/configs/appConfig"
import { Spinner } from "@/components/ui/spinner"
import AppLogo from "@/layouts/components/AppLogo"

// Yup schema for form validation
const formSchema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!")
})

type FormSchema = yup.InferType<typeof formSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const redirectPath = location?.state?.from || appConfig.app.defaultRoute
  const token = useAppSelector(selectCurrenToken)
  // states
  const [serverError, setServerError] = useState<string | null>(null)
  // api
  const [login, { isLoading: isSubmitting }] = useLoginMutation()

  // 1. Define your form.
  const form = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "mor_2314",
      password: "83r5^_"
    }
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: FormSchema) => {
    try {
      const response = await login(values).unwrap()
      const { token } = response
      dispatch(setCredential({ accessToken: token }))
      navigate(redirectPath, { replace: true })
    } catch (error) {
      // Type assertion for error handling
      if (error) {
        const errorMessage =
          (error as CustomError).data || "An unknown error occurred."
        setServerError(errorMessage)
      } else {
        console.error("An unexpected error occurred:", error)
      }
    }
  }

  if (token) {
    return <Navigate to={redirectPath} replace={true} />
  }

  return (
    <Fragment>
      <AppLogo />

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        {serverError ? (
          <div className="px-6 mb-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          </div>
        ) : null}

        <CardContent>
          <Form {...form}>
            <form
              className="grid gap-5"
              autoComplete="off"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="usernameInput">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username..."
                        id="usernameInput"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write down your registered username.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel htmlFor="passwordInput">Password</FormLabel>
                      <Link
                        to="/auth/forget-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        id="passwordInput"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner size="small" className="text-white" />
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isSubmitting}
              >
                Login with Google
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  )
}
