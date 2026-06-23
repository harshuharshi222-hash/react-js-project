explore tanstack table
correction of fileNames
use scss instead of css
remove unused code
remove unused files


     {/* //use autoComplete  */}
            <select
              name="project"
              className="selectE1"
              value={formik.values.project}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
            </select>