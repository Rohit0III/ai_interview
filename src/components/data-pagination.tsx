import { Button } from "@/components/ui/button"

interface Props {
    page: number,
    totalpages: number,
    onPagechange: (page: number) => void
}


const DataPagination = ({ page, totalpages, onPagechange }: Props) => {

    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalpages || 1}
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    disabled={page === 1}
                    variant="outline"
                    size="sm"
                    onClick={() => onPagechange(Math.max(1, page - 1))}
                >
                    Previous
                </Button>
                
                <Button
                    disabled={totalpages === 0 || page === totalpages}
                    variant="outline"
                    size="sm"
                    onClick={() => onPagechange(Math.min(totalpages, page + 1))}
                >
                    Next
                </Button>

            </div>
        </div>
    )
}

export default DataPagination