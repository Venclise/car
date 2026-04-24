
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
 <div className="w-full   h-max     flex flex-col gap-12  overflow-hidden ">
      {/* Image */}
        <div className="w-full h-screen " >
      <Skeleton className=" h-full w-full" />
      </div>

    
    <div className={`flex  justify-between   flex-col lg:flex-row w-full lg:p-10 p-5  `}> 
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-1/3 rounded-md" />
      </div>
    </div>
  );
}
