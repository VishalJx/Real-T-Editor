export default function Joiny({uname, uid, selectedColor}) {
    return (
        <div className="User-Card flex gap-3 border-b border-gray-700 py-3 pt-3">
            <span className={`w-9 h-9 border rounded-full text-center flex items-center justify-center`} style={{backgroundColor:`${selectedColor}`}}>
                {uname && uname.charAt(0).toUpperCase()}
            </span>
            <div>
                <h3 className="font-bold text-sm">{uname}</h3>
                <p className="text-xs text-gray-400">{uid}</p>
            </div>
        </div>
    );
}