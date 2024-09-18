const Tasks: React.FC = () => {

    // Тут запрос на все таски


    const tasks : Array<{title: string, image : string, description : string}> = [
      {
        title : "",
        image : "",
        description: "", 
      },
    ]



  return (
    <div className="p-4">
      {
        tasks.map((value, index) => {
          return <div className="w-full h-[300px] bg-white rounded-[30px]" key={index}>

          </div>
        })
      }
    </div>
  );
};

export default Tasks;