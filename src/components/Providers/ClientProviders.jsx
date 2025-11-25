import ReduxProvider from "./ReduxProvider";

export default function ClientProviders({ children }) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}