import React, { useCallback } from 'react'
import OldZone, { useDropzone } from 'react-dropzone'
import RootRef from '@material-ui/core/RootRef'
import Paper from "@material-ui/core/Paper"

export function Dropzone() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading failed')
            reader.onload = () => {
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        });
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    const { ref, ...rootProps } = getRootProps()

    return (
        // <RootRef rootRef={ref}>
        //     <Paper {...getRootProps}>
        //         <input {...getInputProps} />
        //         <p>Drag 'n' drop files here</p>
        //     </Paper>
        // </RootRef>
        <OldZone onDrop={acceptefFiles => console.log(acceptefFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps}>
                        <input {...getInputProps} />
                        <p>Drag 'n' drop files here</p>
                    </div>
                </section>
            )}
        </OldZone>
    )
}