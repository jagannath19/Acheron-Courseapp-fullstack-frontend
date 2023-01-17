export class Course {
    constructor(
        public objectID:string,
	public courseName:string,
	public category:string,
	public subcategory:string,
	public topics:string[],
	public facultyName:string,
	public durationInDays:number,
	public totalHour:number,
	public status:string,
	public startDate:Date,
	public endDate:Date,
	public languages:string[],

	public subtitles:string[],
	public features:string[],
	public price:number,
	public rating:number,
	public level:string,
	public mode:string
    ){}
}
