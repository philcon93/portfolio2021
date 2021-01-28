export const MenuToggle = (props) => {

    return (
        <div className="p-4 md:hidden">
            <button type="button" onClick={props.toggle}>
                <span className="block w-8 bg-gray-600 rounded" style={{ height: '0.1875rem', marginBottom: '0.375rem' }}></span>
                <span className="block w-8 bg-gray-600 rounded" style={{ height: '0.1875rem', marginBottom: '0.375rem' }}></span>
                <span className="block w-6 bg-gray-600 rounded" style={{ height: '0.1875rem' }}></span>
            </button>
        </div>
    );
};
